export interface Folder {
  tweets?: Array<Tweet>;
  name?: string;
  id?: string;
  _id?: string;
}

export interface Tweet {
  url: string;
  username: string;
  text: string;
  id?: string;
  _id?: string;
  displayPhoto?: string;
  displayName?: string;
  datePosted?: string;
}

export interface User {
  _id: string;
  date: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthenticationState {
  token?: string | null;
  isAuthenticated?: boolean | null;
  loading?: boolean;
  error?: string | boolean | null;
  user?: User | null;
}

export interface AuthenticationContext extends AuthenticationState {
  register: (formData: Credentials) => Promise<void>;
  login: (formData: Credentials) => Promise<void>;
  clearErrors: () => void;
  logout: () => void;
  loadUser: () => Promise<void>;
}
