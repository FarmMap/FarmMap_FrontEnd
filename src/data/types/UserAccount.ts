export default interface UserAccount {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  username?: string;
  password?: string;
  fullName?: string;
  jobTitle?: string;
  description?: string;
  avatar?: File;
  email?: string;
  phoneNumber?: string;
  role?: string;
  isLocked?: boolean;
  homeTown?: string;
  address?: string;
}
