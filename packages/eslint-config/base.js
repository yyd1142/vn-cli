module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  rules: {
    // 要求或禁止使用分号代替 ASI
    semi: [2, 'always'],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [1, 'single'],
    // 如果一个变量从未被重新赋值，使用 const 声明会更好
    'prefer-const': 'error',
    // 强制在对象字面量的键和值之间使用一致的空格
    'key-spacing': [0, { beforeColon: false, afterColon: true }],
    // 强制 typeof 表达式与有效的字符串进行比较
    'valid-typeof': 2,
    // 这个规则可以强制或不允许在箭头函数体周围使用大括号
    'arrow-body-style': 0,
    // 将被解析为模块并检查exports的文件扩展名列表
    'import/extensions': 0,
    // 不导入无关的依赖项
    'import/no-extraneous-dependencies': 0,
    // 导入首选默认导出
    'import/prefer-default-export': 0,
    // 禁止console
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
    // 防止因修改或重新分配函数参数而引起的非预期行为
    'no-param-reassign': 'warn',
    // 消除未使用的变量，函数和函数的参数
    'no-unused-vars': 0,
    // 不允许将指定的名称作为导出的名称使用
    'no-restricted-exports': 0,
    // 禁止在 case 或 default 子句中出现词法声明
    'no-case-declarations': 0,
    // prettier格式化
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        usePrettierrc: false,
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
    // any类型的警告
    '@typescript-eslint/no-explicit-any': 'warn',
    // 禁止定义空的接口
    '@typescript-eslint/no-empty-interface': 'warn',
    // 类型推断
    '@typescript-eslint/no-inferrable-types': 0,
    // 无变量要求
    '@typescript-eslint/no-var-requires': 0,
    // 没被引用的变量
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
