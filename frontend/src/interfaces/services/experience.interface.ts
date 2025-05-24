export interface Experience {
  id?: string;
  title: string;
  company: string;
  location: string;
  startDate: string; // ISO string for date
  endDate: string; // ISO string for date or 'Present'
  responsibilties: string[];
  tags?: string[];
}
