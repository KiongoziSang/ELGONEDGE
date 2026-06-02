import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function OptionPicker<T extends string>({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.options}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.option, selected && styles.selected]}
            >
              <Text style={[styles.optionText, selected && styles.selectedText]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8
  },
  label: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "900"
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  option: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  selected: {
    backgroundColor: colors.blue,
    borderColor: colors.blue
  },
  optionText: {
    color: colors.slate,
    fontSize: 12,
    fontWeight: "900"
  },
  selectedText: {
    color: colors.white
  }
});
