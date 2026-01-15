export interface Riddle {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
}

export interface CreateRiddlePayload {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
}
