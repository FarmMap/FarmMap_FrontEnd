// External
// Internal
// Styles
import classNames from "classnames/bind";
import styles from "./DefaultAvatar.module.scss";
const cx = classNames.bind(styles);

interface DefaultAvatarProps {
  avatar: string;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = (props) => {
  const { avatar, large, medium, small } = props;

  const classes = cx("wrapper", {
    large,
    medium,
    small,
  });

  return <img className={classes} src={avatar} alt="avatar" />;
};

export default DefaultAvatar;
