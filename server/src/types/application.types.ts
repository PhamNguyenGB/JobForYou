export interface ApplicationDto {
  id?: number;
  user_id: number;
  job_post_id: number;
  status: string;
  file_cv?: string;
  note?: string;
}
