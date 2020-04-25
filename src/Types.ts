export interface UserResponse {
  page:        number;
  per_page:    number;
  total:       number;
  total_pages: number;
  data:        UserInfo[];
  ad:          Ad;
}

export interface Ad {
  company: string;
  url:     string;
  text:    string;
}

export interface UserInfo {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  avatar:     string;
}
