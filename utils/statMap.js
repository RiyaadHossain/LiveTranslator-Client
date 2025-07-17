// Map stat title to icon and color for StatCard
export function getStatIconAndColor(title) {
  switch (title.toLowerCase()) {
    case "patients":
      return { icon: "people", color: "#4CAF50" };
    case "sessions":
      return { icon: "language", color: "#2196F3" };
    case "active":
      return { icon: "radio", color: "#FF9800" };
    case "completed":
      return { icon: "checkmark-circle", color: "#9C27B0" };
    default:
      return { icon: "help-circle", color: "#888" };
  }
}
