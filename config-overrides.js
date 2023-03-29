// ghi đè cấu hình webpack để cài đặt thư viện babelrc

const { override, useBabelRc } = require("customize-cra");

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc()
);
