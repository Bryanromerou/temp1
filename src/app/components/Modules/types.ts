export interface ModuleInterface {
  id: number; // Unique Id
  moduleId: string;
  sectionId: string;
  title: string;
  zeroTextCase?: string;
  instructions: string;
  moduleType: string;
  hyperLink?: string;
  freeText?: string;
  hasLink: boolean;
  charLimit: number;
}

export interface FreeTextModule extends ModuleInterface {
  moduleType: "FreeText";
  freeText: string;
  hyperlink?: string;
  charLimit: number;
}

export interface ListModule extends ModuleInterface {
  moduleType: "list";
  listInputs: string[];
  limits: string;
  charLimit: number;
}

export interface SectionType {
  id: string | number;
  title: string | false;
  modules: { [sectionId: string]: ModuleInterface };
}
