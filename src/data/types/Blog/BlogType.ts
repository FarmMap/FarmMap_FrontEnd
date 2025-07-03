import UserAccountType from "../UserAccount/UserAccountType";
import BlogCategoryType from "./BlogCategoryType";

export default interface BlogType {
  order: string;
  isVisible?: any;
  isFeatured?: any;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  content?: string;
  description?: string;
  articleCategories?: string;
  image?: File;
  user?: UserAccountType;
  categories?: BlogCategoryType[];
}
