import type { FC } from "react";
import Counter from "./Counter";
import CloseOutsideClick from "./CloseOutsideClick";
import InlineEditableInput from "./InlineEditableInput";
import TemperatureConverter from "./TemperatureConverter";
import OTPInput from "./OTPInput";
import FormValidate from "./FormValidate";
import AnimatedFlipCard from "./AnimatedFlipCard";
import CustomTabs from "./CustomTabs";
import FlatArray from "./FlatArray";
import FlattenObject from "./FlattenObject";
import CustomModal from "./CustomModal";
import DeepClone from "./DeepClone";
import EcommerceProductList from "./EcommerceProductList";
import KanbanBoard from "./KanbanBoard";
import StringCompression from "./StringCompression";
import DebounceSearch from "./DebounceSearch";
import MultiStepForm from "./MultiStepForm";
import PromiseAllPolyfill from "./PromiseAllPolyfill";
import TodoList from "./TodoList";
import SequentialProgressBar from "./SequentialProgressBar";
import StickySidebar from "./StickySidebar";
import PasswordStrength from "./PasswordStrength";
import GroupByUtility from "./GroupByUtility";
import ResizablePanel from "./ResizablePanel";
import HorizontalScrollMenu from "./HorizontalScrollMenu";
import SearchNested from "./SearchNested";
import JSONDiffViewer from "./JSONDiffViewer";
import DynamicForm from "./DynamicForm";
import FileExplorer from "./FileExplorer";

export interface Project {
  title: string;
  path: string;
  description: string;
  component: FC;
}

export const projects: Project[] = [
  {
    title: "Counter app with undo and redo",
    path: "counter",
    description:
      "A counter app with undo/redo functionality using React state history.",
    component: Counter,
  },
  {
    title: "Close on Outside Click",
    path: "close-outside",
    description: "Modal that closes when clicking outside.",
    component: CloseOutsideClick,
  },
  {
    title: "Inline editable input",
    path: "inline-editable",
    description: "Input field editable inline, with save on blur.",
    component: InlineEditableInput,
  },
  {
    title: "Temperature converter",
    path: "temperature-converter",
    description: "Convert Celsius/Fahrenheit dynamically.",
    component: TemperatureConverter,
  },
  {
    title: "OTP Input feature",
    path: "otp-input",
    description: "Custom OTP input with focus handling.",
    component: OTPInput,
  },
  {
    title: "Form Validate",
    path: "form-validate",
    description: "Basic form with validation logic.",
    component: FormValidate,
  },
  {
    title: "Animated Flip card using pure CSS",
    path: "animated-flip-card",
    description: "CSS-only flip card animation.",
    component: AnimatedFlipCard,
  },
  {
    title: "Custom tabs with keyboard interaction",
    path: "custom-tabs",
    description: "Tabs with full keyboard support.",
    component: CustomTabs,
  },
  {
    title: "Flat array without Array.flat()",
    path: "flat-array",
    description: "Implement array flattening manually.",
    component: FlatArray,
  },
  {
    title: "Flatten object inspector",
    path: "flatten-object",
    description: "Inspect and flatten nested objects.",
    component: FlattenObject,
  },
  {
    title: "Custom modal with keyboard interaction",
    path: "custom-modal",
    description: "Modal component with ESC key close.",
    component: CustomModal,
  },
  {
    title: "Deep clone",
    path: "deep-clone",
    description: "Implement deep clone function.",
    component: DeepClone,
  },
  {
    title: "E-Commerce product list with API & Context",
    path: "ecommerce-product-list",
    description: "Fetch and display products using context.",
    component: EcommerceProductList,
  },
  {
    title: "Kanban Board",
    path: "kanban-board",
    description: "Basic Kanban board with drag & drop.",
    component: KanbanBoard,
  },
  {
    title: "String compression preview",
    path: "string-compression",
    description: "Preview compressed strings logic.",
    component: StringCompression,
  },
  {
    title: "Debounce search with API integration",
    path: "debounce-search",
    description: "Search input with debounce API calls.",
    component: DebounceSearch,
  },
  {
    title: "Multi step form",
    path: "multi-step-form",
    description: "Form with multiple steps and validation.",
    component: MultiStepForm,
  },
  {
    title: "Promise.all polyfill with multiple API call",
    path: "promise-all-polyfill",
    description: "Polyfill Promise.all and use with APIs.",
    component: PromiseAllPolyfill,
  },
  {
    title: "Todo List",
    path: "todo-list",
    description: "Classic todo list with add/remove.",
    component: TodoList,
  },
  {
    title: "Sequential progress bar",
    path: "sequential-progress",
    description: "Animated progress bars running sequentially.",
    component: SequentialProgressBar,
  },
  {
    title: "Sticky sidebar component",
    path: "sticky-sidebar",
    description: "Sidebar that stays fixed when scrolling.",
    component: StickySidebar,
  },
  {
    title: "Password strength check",
    path: "password-strength",
    description: "Check password strength dynamically.",
    component: PasswordStrength,
  },
  {
    title: "GroupBy utility",
    path: "groupby-utility",
    description: "Implement groupBy array utility.",
    component: GroupByUtility,
  },
  {
    title: "Resizable panel (Split layout)",
    path: "resizable-panel",
    description: "Resizable panels using mouse drag.",
    component: ResizablePanel,
  },
  {
    title: "Horizontal scroll menu",
    path: "horizontal-scroll",
    description: "Scrollable horizontal menu.",
    component: HorizontalScrollMenu,
  },
  {
    title: "Search in a nested structure",
    path: "search-nested",
    description: "Search algorithm for nested data.",
    component: SearchNested,
  },
  {
    title: "JSON diff viewer",
    path: "json-diff-viewer",
    description: "Visualize differences between JSON objects.",
    component: JSONDiffViewer,
  },
  {
    title: "Dynamic form",
    path: "dynamic-form",
    description: "Generate forms dynamically from config.",
    component: DynamicForm,
  },
  {
    title: "File explorer",
    path: "file-explorer",
    description: "Basic file explorer with nested structure.",
    component: FileExplorer,
  },
];
