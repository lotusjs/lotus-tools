export interface IOptions {
  // 组件库目录
  libraryDir?: string;
  createComponent?: {
    // 是否支持多语言
    // 默认: true
    locale?: boolean;
    // 组件库前缀
    // 默认: 'lotus'
    prefixCls?: string;
  }
}
