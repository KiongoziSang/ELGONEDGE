import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppInput } from "../components/AppInput";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { OptionPicker } from "../components/OptionPicker";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useApiData } from "../hooks/useApiData";
import { getCommunityPosts, submitCommunityPost } from "../services/api/community";
import { colors } from "../theme";
import type { CommunityPost } from "../types";
import { formatDate } from "../utils/format";

const postTypes: CommunityPost["type"][] = [
  "Public resident post",
  "Private grievance"
];

export function CommunityScreen() {
  const loaded = useApiData<CommunityPost[]>(getCommunityPosts, []);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<CommunityPost["type"]>("Public resident post");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const visiblePosts = [...posts, ...loaded.data].filter(
    (post) => post.status === "Approved" || post.status === "Private" || post.status === "Pending review"
  );

  async function submit() {
    if (!title.trim() || !message.trim()) {
      setFeedback("Add a title and message before submitting.");
      return;
    }

    setSubmitting(true);
    const post = await submitCommunityPost({ title, message, type });
    setPosts((current) => [post, ...current]);
    setTitle("");
    setMessage("");
    setFeedback("Submitted. Management approval is mocked for MVP1.");
    setSubmitting(false);
  }

  return (
    <Screen
      title="Community"
      subtitle="A controlled communication layer for approved posts, notices, and private grievances."
    >
      <SectionHeader title="Submit post or grievance" action="Moderated" />
      <AppCard>
        <View style={styles.form}>
          <OptionPicker label="Post type" options={postTypes} value={type} onChange={setType} />
          <AppInput label="Title" value={title} onChangeText={setTitle} placeholder="Short title" />
          <AppInput label="Message" value={message} onChangeText={setMessage} placeholder="Write your message..." multiline />
          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
          <AppButton label={submitting ? "Submitting..." : "Submit for review"} onPress={() => void submit()} disabled={submitting} />
        </View>
      </AppCard>

      <SectionHeader title="Community feed" />
      {loaded.loading ? <LoadingState label="Loading community posts..." /> : null}
      {loaded.error ? <EmptyState title="Unable to load community" text={loaded.error} /> : null}
      {!loaded.loading && visiblePosts.length === 0 ? (
        <EmptyState title="No approved community posts" text="Approved posts and official notices will appear here." />
      ) : (
        <View style={styles.stack}>
          {visiblePosts.map((post) => (
            <AppCard key={post.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{post.title}</Text>
                  <Text style={styles.meta}>{post.type} · {formatDate(post.date)}</Text>
                  <Text style={styles.message}>{post.message}</Text>
                </View>
                <StatusBadge label={post.status} />
              </View>
            </AppCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14
  },
  feedback: {
    color: colors.success,
    fontSize: 13,
    fontWeight: "800"
  },
  stack: {
    gap: 10
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1
  },
  title: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900"
  },
  meta: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5
  },
  message: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  }
});
