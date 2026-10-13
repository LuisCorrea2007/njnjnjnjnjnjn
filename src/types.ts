export interface BlockStyle {
  [key: string]: string | undefined;
}

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  style: BlockStyle;
  children?: Block[];
  attributes?: Record<string, string>;
  locked?: boolean;
  hidden?: boolean;
}

export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'container'
  | 'columns'
  | 'divider'
  | 'spacer'
  | 'video'
  | 'form'
  | 'navbar'
  | 'hero'
  | 'features'
  | 'testimonial'
  | 'pricing'
  | 'footer'
  | 'gallery'
  | 'map'
  | 'icon-box'
  | 'list'
  | 'card'
  | 'cta'
  | 'stats'
  | 'team'
  | 'faq'
  | 'newsletter'
  | 'social-links'
  | 'countdown'
  | 'tabs'
  | 'accordion';

export interface Page {
  id: string;
  name: string;
  slug: string;
  blocks: Block[];
  isHome: boolean;
}

export interface ProjectSettings {
  title: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  backgroundColor: string;
}

export interface EditorState {
  pages: Page[];
  currentPageId: string;
  selectedBlockId: string | null;
  hoveredBlockId: string | null;
  settings: ProjectSettings;
  history: Page[][];
  historyIndex: number;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  showPreview: boolean;
  showTemplates: boolean;
  showCodeExport: boolean;
  leftPanel: 'components' | 'pages' | 'templates' | 'layers';
  rightPanel: 'properties' | 'styles' | 'settings';
  zoom: number;
}

export interface ComponentCategory {
  name: string;
  icon: string;
  items: ComponentItem[];
}

export interface ComponentItem {
  type: BlockType;
  label: string;
  icon: string;
  description: string;
  defaultContent?: string;
  defaultStyle?: BlockStyle;
}
