module.exports = {
    semi: true, // セミコロンを末尾につける
    singleQuote: true, // シングルクォートを使う
    useTabs: true, // スペースではなくタブを使う ←★ここがポイント
    tabWidth: 2, // 表示上のタブ幅（エディタが対応していれば）
    trailingComma: 'all', // 配列・オブジェクトなど末尾カンマを付ける
    bracketSpacing: true, // { foo: bar } のようにスペースを入れる
    arrowParens: 'avoid', // アロー関数の引数が1つなら括弧を省略
    jsxSingleQuote: false, // JSX内はダブルクォート
    printWidth: 100, // 1行の最大文字数
    endOfLine: 'lf', // 改行コードはLF
    jsxBracketSameLine: false, // JSXタグの閉じカッコは改行
};
