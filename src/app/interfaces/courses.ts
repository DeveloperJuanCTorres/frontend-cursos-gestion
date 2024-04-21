export interface Courses {
  id: number | null;
  name: string;
  schedule: string;
  date_ini: Date | null;
  date_end: Date | null;
  type: string;
  isAssigned?: boolean | false;
}

