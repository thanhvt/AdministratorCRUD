"use client"

// Form Components
/** Form input and related components */
export { Input } from "./components/input"
export { Label } from "./components/label"
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from "./components/select"
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
} from "./components/form"

// Layout Components
/** Layout and container components */
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "./components/card"
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "./components/dialog"
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
} from "./components/sheet"
export { Sidebar } from "./components/sidebar"
export { Header } from "./components/header"
export { Footer } from "./components/footer"

// Navigation Components
/** Navigation and menu components */
export { Breadcrumb } from "./components/breadcrumb"
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
} from "./components/dropdown-menu"

// Feedback Components
/** User feedback and notification components */
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "./components/tooltip"
export { Toaster } from "./components/toast"
export { Skeleton } from "./components/skeleton"

// Basic UI Components
/** Basic UI elements */
export { Button, buttonVariants } from "./components/button"
export { Badge, badgeVariants } from "./components/badge"
export {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "./components/avatar"
export { Icon } from "./components/icon"
export { Logo } from "./components/logo"
export { EmptyState } from "./components/empty-state"
export { ThemeToggle } from "./components/theme-toggle"

// Data Display Components
/** Data display components */
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from "./components/table"

// Animations
export { staggerContainer, fadeIn, slideIn } from "./lib/animations"
export { default as SplashCursor } from "./components/splashCursor";

// Utils
/** Utility functions */
export { cn } from "./lib/utils"

// Performance Note: For better performance with large bundles, consider lazy loading heavy components using dynamic imports.
// Error Handling Note: Build tools will catch missing files; ensure all component files exist.