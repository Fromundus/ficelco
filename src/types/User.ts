type User = {
  account_number: string;
  address: string;
  book: string;
  department: any;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  occupant: string;
  phone_number: string;
  role: string;

  profile_picture: string;
} | null;

export default User;