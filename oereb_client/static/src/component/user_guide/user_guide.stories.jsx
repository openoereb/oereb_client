import React from "react";

import OerebUserGuide from "./user_guide";

export default {
  title: 'API Reference/Component/User Guide',
  component: OerebUserGuide,
  tags: ['autodocs']
};

export const UserGuide = () => <OerebUserGuide />;
UserGuide.title = 'User Guide';
