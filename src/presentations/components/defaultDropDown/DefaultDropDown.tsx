// External files

import "tippy.js/dist/tippy.css";

import Tippy from "@tippyjs/react/headless";

// Internal files

// Styles

interface DefaultDropDownProps {
  children: JSX.Element;
  childrenRender: JSX.Element;
  visible?: boolean;
}

const DefaultDropDown: React.FC<DefaultDropDownProps> = (props) => {
  const { children, childrenRender, visible } = props;
  return (
    <div>
      <Tippy
        visible={visible}
        render={(attrs) => (
          <div tabIndex={-1} {...attrs} style={{ pointerEvents: "auto" }}>
            {childrenRender}
          </div>
        )}
        placement="bottom"
      >
        {children}
      </Tippy>
    </div>
  );
};

export default DefaultDropDown;
