import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppInput } from "../components/AppInput";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { OptionPicker } from "../components/OptionPicker";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { useApiData } from "../hooks/useApiData";
import {
  createResidentConnectNotice,
  getResidentConnect,
  replyResidentConnectNotice,
  reportResidentConnectNotice
} from "../services/api/residentConnect";
import { colors } from "../theme";
import type { ResidentConnectData, ResidentConnectNotice } from "../types";
import { formatDate } from "../utils/format";

export function ResidentConnectScreen() {
  const loaded = useApiData<ResidentConnectData>(getResidentConnect, { items: [], targetUnits: [], categories: [], templates: [] });
  const [unitId, setUnitId] = useState("");
  const [category, setCategory] = useState("PARKING");
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [reportText, setReportText] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const received = useMemo(() => loaded.data.items.filter((item) => item.direction === "received"), [loaded.data.items]);
  const sent = useMemo(() => loaded.data.items.filter((item) => item.direction === "sent"), [loaded.data.items]);
  const selectedUnitLabel = loaded.data.targetUnits.find((unit) => unit.id === unitId)?.label ?? "";
  const selectedCategoryLabel = loaded.data.categories.find((item) => item.value === category)?.label ?? "Parking";

  async function sendNotice() {
    setBusy(true);
    setFeedback(null);
    try {
      const response = await createResidentConnectNotice({
        recipientUnitId: unitId,
        category,
        template,
        message
      });
      setFeedback(response.message ?? "Notice sent.");
      setMessage("");
      setTemplate("");
      await loaded.reload();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to send notice.");
    } finally {
      setBusy(false);
    }
  }

  async function sendReply(noticeId: string) {
    setBusy(true);
    try {
      const response = await replyResidentConnectNotice(noticeId, replyText[noticeId] ?? "");
      setFeedback(response.message ?? "Reply sent.");
      setReplyText((current) => ({ ...current, [noticeId]: "" }));
      await loaded.reload();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to reply.");
    } finally {
      setBusy(false);
    }
  }

  async function reportNotice(noticeId: string) {
    setBusy(true);
    try {
      const response = await reportResidentConnectNotice(noticeId, reportText[noticeId] ?? "");
      setFeedback(response.message ?? "Notice reported.");
      setReportText((current) => ({ ...current, [noticeId]: "" }));
      await loaded.reload();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to report notice.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen title="Resident Connect" subtitle="Private unit-to-unit notices. Phone numbers stay hidden.">
      {loaded.loading ? <LoadingState label="Loading Resident Connect..." /> : null}
      {loaded.error ? <EmptyState title="Unable to load Resident Connect" text={loaded.error} actionLabel="Retry" onAction={() => void loaded.reload()} /> : null}
      {!loaded.loading && !loaded.error ? (
        <View style={styles.stack}>
          <AppCard>
            <Text style={styles.cardTitle}>Send a notice</Text>
            <Text style={styles.help}>Use short, practical messages for parking, gate, safety, leak, noise, or lost item issues.</Text>
            {loaded.data.targetUnits.length ? (
              <View style={styles.form}>
                <OptionPicker
                  label="Target unit"
                  value={selectedUnitLabel}
                  options={loaded.data.targetUnits.map((unit) => unit.label)}
                  onChange={(label) => setUnitId(loaded.data.targetUnits.find((unit) => unit.label === label)?.id ?? "")}
                />
                <OptionPicker
                  label="Category"
                  value={selectedCategoryLabel}
                  options={loaded.data.categories.map((item) => item.label)}
                  onChange={(label) => setCategory(loaded.data.categories.find((item) => item.label === label)?.value ?? "GENERAL")}
                />
                <OptionPicker label="Quick template" value={template || "Write my own"} options={["Write my own", ...loaded.data.templates]} onChange={(value) => setTemplate(value === "Write my own" ? "" : value)} />
                <AppInput label="Message" value={message} onChangeText={setMessage} placeholder="Short respectful message" multiline />
                {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
                <AppButton label={busy ? "Sending..." : "Send notice"} onPress={() => void sendNotice()} disabled={busy || !unitId || (!message.trim() && !template)} />
              </View>
            ) : (
              <EmptyState title="No units available" text="Resident Connect needs another occupied unit in your property." />
            )}
          </AppCard>

          <SectionHeader title="Received" />
          {received.length ? received.map((notice) => <NoticeCard key={notice.id} notice={notice} busy={busy} replyText={replyText[notice.id] ?? ""} reportText={reportText[notice.id] ?? ""} setReplyText={(value) => setReplyText((current) => ({ ...current, [notice.id]: value }))} setReportText={(value) => setReportText((current) => ({ ...current, [notice.id]: value }))} onReply={() => void sendReply(notice.id)} onReport={() => void reportNotice(notice.id)} />) : <EmptyState title="No received notices" text="Neighbour notices sent to your unit will appear here." />}

          <SectionHeader title="Sent" />
          {sent.length ? sent.map((notice) => <NoticeCard key={notice.id} notice={notice} busy={busy} replyText={replyText[notice.id] ?? ""} reportText={reportText[notice.id] ?? ""} setReplyText={(value) => setReplyText((current) => ({ ...current, [notice.id]: value }))} setReportText={(value) => setReportText((current) => ({ ...current, [notice.id]: value }))} onReply={() => void sendReply(notice.id)} onReport={() => void reportNotice(notice.id)} />) : <EmptyState title="No sent notices" text="Your Resident Connect notices will appear here." />}
        </View>
      ) : null}
    </Screen>
  );
}

function NoticeCard({
  notice,
  busy,
  replyText,
  reportText,
  setReplyText,
  setReportText,
  onReply,
  onReport
}: {
  notice: ResidentConnectNotice;
  busy: boolean;
  replyText: string;
  reportText: string;
  setReplyText: (value: string) => void;
  setReportText: (value: string) => void;
  onReply: () => void;
  onReport: () => void;
}) {
  const peer = notice.direction === "received" ? `From ${notice.senderUnitLabel}` : `To ${notice.recipientUnitLabel}`;
  return (
    <AppCard>
      <View style={styles.noticeTop}>
        <View style={styles.noticeCopy}>
          <Text style={styles.noticeTitle}>{notice.categoryLabel}</Text>
          <Text style={styles.meta}>{peer} · {formatDate(notice.createdAt)}</Text>
        </View>
        <Text style={[styles.status, notice.urgent && styles.urgent]}>{notice.urgent ? "Safety" : notice.statusLabel}</Text>
      </View>
      <Text style={styles.message}>{notice.message}</Text>
      {notice.replies.map((reply) => (
        <View key={reply.id} style={styles.reply}>
          <Text style={styles.replyText}><Text style={styles.replyAuthor}>{reply.mine ? "You" : "Neighbour"}: </Text>{reply.message}</Text>
        </View>
      ))}
      <View style={styles.form}>
        <AppInput label="Reply" value={replyText} onChangeText={setReplyText} placeholder="Reply privately inside ElgonOS" />
        <AppButton label="Send reply" variant="secondary" disabled={busy || !replyText.trim()} onPress={onReply} />
        <Pressable onPress={onReport} disabled={busy || !reportText.trim()}>
          <Text style={styles.report}>Report abuse</Text>
        </Pressable>
        <AppInput label="Report reason" value={reportText} onChangeText={setReportText} placeholder="Only needed if reporting" />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 14
  },
  cardTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900"
  },
  help: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6
  },
  form: {
    gap: 12,
    marginTop: 14
  },
  feedback: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "800"
  },
  noticeTop: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  noticeCopy: {
    flex: 1
  },
  noticeTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4
  },
  status: {
    backgroundColor: colors.infoSoft,
    borderRadius: 999,
    color: colors.blue,
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  urgent: {
    backgroundColor: colors.warningSoft,
    color: colors.warning
  },
  message: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12
  },
  reply: {
    backgroundColor: colors.softGrey,
    borderRadius: 14,
    marginTop: 10,
    padding: 10
  },
  replyText: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 19
  },
  replyAuthor: {
    color: colors.ink,
    fontWeight: "900"
  },
  report: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center"
  }
});
