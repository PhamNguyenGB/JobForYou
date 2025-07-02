export interface JobPostDto {
  id?: number;
  company_id: number;
  title: string;
  description: string;
  salary?: string;
  benefits?: string;
  deadline: Date;
  skills?: string;
  education?: string;
  quantity?: number;
  status: string;
  user_id?: number;
  category_id?: number;
}
