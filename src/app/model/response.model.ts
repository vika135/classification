export interface ClassificationResponse {
  result: Result[];
}

export interface Result {
  classifier: string;
  confidence: string;
  category: string;
  statistics: ClassifierStatistics[];
}

export interface ClassifierStatistics {
  category: string;
  confidence: string;
}
