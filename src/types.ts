export interface FeatureDefinition {
  slug: string;
  title: string;
  category: string;
  order: number;
}

export interface CategoryDefinition {
  slug: string;
  title: string;
  order: number;
  features: FeatureDefinition[];
}

export interface FeaturesConfig {
  categories: CategoryDefinition[];
}

export interface FeatureFrontmatter {
  title: string;
  language: string;
  feature: string;
  category: string;
  applicable: boolean;
}

export interface FeatureContent {
  frontmatter: FeatureFrontmatter;
  body: string;
}

export interface ComparisonPair {
  feature: FeatureDefinition;
  known: FeatureContent;
  learning: FeatureContent;
}

export interface LanguageInfo {
  slug: string;
  name: string;
  featureCount: number;
}

export interface ProgressState {
  knownLang: string;
  learningLang: string;
  completed: string[];
  lastFeature: string | null;
}
