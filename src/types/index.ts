export interface LinkProps {
  id?: number;
  short_url?: string;
  alias?: string;
  target: string;
  qrCode?: string;
  visit_count?: number;
  created_at?: Date;
  created_by?: string;
}

export interface SlugProps {
  params: {slug: string};
}

export interface LinkListProps {
  error?: unknown;
  count?: number;
  status?: unknown;
  statusText?: string;
  data: LinkProps[] | null;
}
