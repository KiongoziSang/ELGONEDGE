import { StyleSheet, Text, View } from "react-native";
import { AmountCard } from "../components/AmountCard";
import { AppCard } from "../components/AppCard";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useApiData } from "../hooks/useApiData";
import { getInvoices, getPaymentInstructions, getReceipts } from "../services/api/payments";
import { colors } from "../theme";
import type { Invoice, Receipt } from "../types";
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

  return (
    <Screen title="Payments" subtitle="Rent balance, payment instructions, invoices, and payment history.">
      {invoices.loading || instructions.loading ? <LoadingState label="Loading payment details..." /> : null}
      {invoices.error ? <EmptyState title="Unable to load invoices" text={invoices.error} /> : null}
      {currentInvoice ? (
        <>
          <AmountCard
            label="Amount due"
            amount={currentInvoice.amount}
            detail={`${currentInvoice.invoiceNumber} · Due ${formatDate(currentInvoice.dueDate)}`}
            status={currentInvoice.status}
          />
          <SectionHeader title="Payment methods" action="Live confirmation later" />
          <View style={styles.stack}>
            <InstructionCard
              title="M-PESA PayBill"
              lines={[
                `Business number: ${instructions.data.paymentInstructions.businessNumber}`,
                `Account/reference: ${instructions.data.paymentInstructions.accountReference}`,
                "Live payment confirmation will be integrated later."
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
                "Upload proof placeholder will be enabled after backend integration."
              ]}
            />
            <InstructionCard
              title="Card"
              lines={[instructions.data.paymentInstructions.cardProvider, "Checkout link placeholder for MVP1."]}
            />
          </View>
        </>
      ) : null}

      <SectionHeader title="Invoices" />
      {invoices.loading ? null : invoices.data.length === 0 ? (
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
                <StatusBadge label={invoice.status} />
              </View>
            </AppCard>
          ))}
        </View>
      )}

      <SectionHeader title="Payment history" />
      {receipts.loading ? <LoadingState label="Loading payment history..." /> : receipts.data.length === 0 ? (
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
                <StatusBadge label={receipt.status} />
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
