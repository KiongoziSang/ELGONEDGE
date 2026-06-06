import { StyleSheet, Text, View } from "react-native";
import { AmountCard } from "../components/AmountCard";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { useApiData } from "../hooks/useApiData";
import { getInvoices, getPaymentInstructions, getReceipts } from "../services/api/payments";
import { colors } from "../theme";
import type { Invoice, Receipt } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatDate, formatKes } from "../utils/format";

export function PaymentsScreen() {
  const invoices = useApiData<Invoice[]>(getInvoices, []);
  const receipts = useApiData<Receipt[]>(getReceipts, []);
  const instructions = useApiData(getPaymentInstructions, {
    paymentMethods: [],
    paymentInstructions: {
      businessNumber: "",
      accountReference: "",
      bankName: "",
      bankAccount: "",
      tillNumber: "",
      cardProvider: ""
    }
  });

  const currentInvoice = invoices.data[0];
  const currentPaymentStatus = currentInvoice ? getPaymentStatus(currentInvoice) : "No balance";

  return (
    <Screen title="Payments" subtitle="Rent balance, payment instructions, invoices, and payment history.">
      {invoices.loading || instructions.loading ? <LoadingState label="Loading payment details..." /> : null}
      {invoices.error ? <EmptyState title="Unable to load invoices" text={invoices.error} actionLabel="Retry" onAction={() => void invoices.reload()} /> : null}
      {currentInvoice ? (
        <>
          <AmountCard
            label="Current rent balance"
            amount={currentInvoice.amount}
            detail={`${currentInvoice.invoiceNumber} · Due ${formatDate(currentInvoice.dueDate)}`}
            status={currentPaymentStatus}
          />
          <View style={styles.summaryRow}>
            <AppCard compact>
              <Text style={styles.smallLabel}>Next due date</Text>
              <Text style={styles.smallValue}>{formatDate(currentInvoice.dueDate)}</Text>
            </AppCard>
            <AppCard compact>
              <Text style={styles.smallLabel}>Payment status</Text>
              <Text style={styles.smallValue}>{currentPaymentStatus}</Text>
            </AppCard>
          </View>
          <SectionHeader title="Payment methods" action="Setup dependent" />
          <View style={styles.stack}>
            <InstructionCard
              title="M-PESA PayBill"
              lines={[
                `Business number: ${instructions.data.paymentInstructions.businessNumber}`,
                `Account/reference: ${instructions.data.paymentInstructions.accountReference}`,
                "Use this M-PESA-aware reference for payment tracking and reconciliation-ready workflows."
              ]}
            />
            <InstructionCard
              title="Bank PayBill / Till"
              lines={[
                `Till number: ${instructions.data.paymentInstructions.tillNumber}`,
                "Use your invoice number or unit number as the reference."
              ]}
            />
            <InstructionCard
              title="Bank Transfer"
              lines={[
                `Bank: ${instructions.data.paymentInstructions.bankName}`,
                `Account: ${instructions.data.paymentInstructions.bankAccount}`,
                "Use the invoice or unit reference shown here when paying."
              ]}
            />
            <InstructionCard
              title="Card"
              lines={[instructions.data.paymentInstructions.cardProvider, "Card checkout is available depending on client setup."]}
            />
          </View>
        </>
      ) : !invoices.loading && !invoices.error ? (
        <EmptyState title="No payments found yet" text="Rent balances, invoices, and payment instructions will appear here." />
      ) : null}

      <SectionHeader title="Invoices" />
      {invoices.loading || invoices.error ? null : invoices.data.length === 0 ? (
        <EmptyState title="No invoices found" text="Rent invoices will appear here once available." />
      ) : (
        <View style={styles.stack}>
          {invoices.data.map((invoice) => (
            <AppCard key={invoice.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{invoice.title}</Text>
                  <Text style={styles.meta}>{invoice.invoiceNumber} · {formatDate(invoice.date)}</Text>
                  <Text style={styles.amount}>{formatKes(invoice.amount)}</Text>
                </View>
                <BadgeRow labels={[isRecentlyAdded(invoice.date) && "NEW", invoice.status]} />
              </View>
            </AppCard>
          ))}
        </View>
      )}

      <SectionHeader title="Payment history" />
      {receipts.error ? (
        <EmptyState title="Unable to load payment history" text={receipts.error} actionLabel="Retry" onAction={() => void receipts.reload()} />
      ) : receipts.loading ? <LoadingState label="Loading payment history..." /> : receipts.data.length === 0 ? (
        <EmptyState title="No payment history found" text="Confirmed rent payments will appear here." />
      ) : (
        <View style={styles.stack}>
          {receipts.data.map((receipt) => (
            <AppCard key={receipt.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{receipt.title}</Text>
                  <Text style={styles.meta}>{receipt.receiptNumber} · {formatDate(receipt.date)}</Text>
                  <Text style={styles.amount}>{formatKes(receipt.amount)}</Text>
                </View>
                <BadgeRow labels={[isRecentlyAdded(receipt.date) && "NEW", receipt.status]} />
              </View>
            </AppCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

function InstructionCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <AppCard>
      <Text style={styles.title}>{title}</Text>
      {lines.map((line) => (
        <Text key={line} style={styles.meta}>{line}</Text>
      ))}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 10
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12
  },
  smallLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  smallValue: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 6
  },
  row: {
    alignItems: "flex-start",
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
  amount: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 8
  }
});

function getPaymentStatus(invoice: Invoice) {
  if (invoice.status === "Paid" || invoice.status === "Overdue" || invoice.status === "Partially paid") {
    return invoice.status;
  }

  const dueTime = new Date(invoice.dueDate).getTime();
  if (!Number.isFinite(dueTime)) {
    return invoice.status;
  }

  const daysUntilDue = Math.ceil((dueTime - Date.now()) / (24 * 60 * 60 * 1000));
  if (daysUntilDue < 0) {
    return "Overdue";
  }

  if (daysUntilDue <= 7) {
    return "Due soon";
  }

  return invoice.status;
}
