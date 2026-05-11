// index.js

// Button variants
export {BasicButton} from './components/buttons/BasicButton';
export { ActionButton } from "./components/buttons/ActionButton";
export { ConfirmButton } from "./components/buttons/ConfirmButton";
export { LinkButton } from "./components/buttons/LinkButton";
export {IconActionButton} from "./components/buttons/IconActionButton"
export { SubmitButton } from "./components/buttons/SubmitButton";

// Carousal
export {BasicCarousel} from './components/carousel/BasicCarousel';

// Calendar / Date Inputs
export { ContextualDatePicker } from './components/calendar/ContextualDatePicker';
export { ContextualDateRangePicker } from './components/calendar/ContextualDateRangePicker';

// Loading / Skeletons
export { Skeleton } from './components/loading/Skeleton';
export { CardSkeleton } from './components/loading/CardSkeleton';
export { ListSkeleton } from './components/loading/ListSkeleton';
export { ProfileSkeleton } from './components/loading/ProfileSkeleton';
export { TableSkeleton } from './components/loading/TableSkeleton';

// Footer
export { DynamicFooter } from './components/footer/DynamicFooter';
export { SimpleFooter } from './components/footer/SimpleFooter';
export { NewsletterFooter } from './components/footer/NewsletterFooter';

// Modals
export { CenteredModal } from './components/modals/CenteredModal';
export { CardModal } from './components/modals/CardModal';
export { DeleteModal } from './components/modals/DeleteModal';
export { BadgeSuccessModal } from './components/modals/BadgeSuccessModal';
export { SuccessModal } from './components/modals/SuccessModal';
export { ConfirmationModal } from './components/modals/ConfirmationModal';

// Dynamic Island
export { DynamicIsland, useDynamicIsland } from './components/dynamic-island/DynamicIsland';

// Auth
export { AuthForm } from './components/auth/AuthForm';

// Documents
export { FileCard } from './components/documents/FileCard';
export { FileList } from './components/documents/FileList';
export { FileUpload } from './components/documents/FileUpload';
export { FileTypeBadge } from './components/documents/FileTypeBadge';
export { getFileType, formatBytes, formatDate } from './components/documents/fileUtils';