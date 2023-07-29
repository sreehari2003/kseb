export type Child = {
  children: React.ReactNode;
};

export interface Issue {
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  ID: number;
  title: string;
  desc: string;
  postID: string;
  onClick: () => Promise<void>;
}
export interface Data {
  data: Issue;
  ok: boolean;
  response: string;
}
