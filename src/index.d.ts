import { FC } from 'react';

export interface HTMLEditorProps {
    /**
     * Initial HTML content to load in the editor
     */
    initialHTML?: string;

    /**
     * Default file name for downloads
     * @default 'document.html'
     */
    fileName?: string;

    /**
     * Callback function called when the user saves the content
     * Receives the complete HTML string including Doctype
     */
    onSave?: (htmlContent: string) => void;

    /**
     * Callback function called when the content changes
     * Receives the complete HTML string including Doctype
     */
    onChange?: (htmlContent: string) => void;

    /**
     * Whether to show the toolbar with Load/Reset/Save buttons
     * @default true
     */
    showToolbar?: boolean;

    /**
     * Array of image URLs that can be used to replace images in the HTML
     * When provided, images in the editor become clickable and can be replaced
     * @default []
     */
    assets?: string[];
}

/**
 * HTMLEditor Component
 *
 * A full-page HTML editor that allows users to edit text content within complete HTML documents.
 *
 * Features:
 * - Iframe isolation for CSS/JS separation
 * - ContentEditable for native editing
 * - Preserves HTML structure, styles, and scripts
 * - Download edited HTML with proper Doctype
 * - Load external HTML files
 *
 * @example
 * ```tsx
 * import HTMLEditor from 'canva-editor';
 * import 'canva-editor/dist/style.css';
 *
 * function App() {
 *   const handleSave = (html) => console.log(html);
 *
 *   return (
 *     <HTMLEditor
 *       initialHTML="<!DOCTYPE html><html>...</html>"
 *       fileName="my-page.html"
 *       onSave={handleSave}
 *     />
 *   );
 * }
 * ```
 */
declare const HTMLEditor: FC<HTMLEditorProps>;

/**
 * Error Boundary for HTMLEditor
 *
 * Catches and displays errors that occur within the HTMLEditor component tree.
 * Provides user-friendly error messages and recovery options.
 *
 * @example
 * ```tsx
 * import { HTMLEditor, ErrorBoundary } from 'canva-editor';
 *
 * function App() {
 *   return (
 *     <ErrorBoundary>
 *       <HTMLEditor initialHTML={html} />
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */
export class ErrorBoundary extends React.Component<{
    children: React.ReactNode;
}> {}

export default HTMLEditor;
export { HTMLEditor };
