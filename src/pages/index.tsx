import { Inter } from "next/font/google";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type UnicodeBlock = {
  name: string;
  range: [number, number];
};

const unicodeBlocks: UnicodeBlock[] = [
  { name: "InBasic_Latin", range: [0x0000, 0x007f] },
  { name: "InLatin-1_Supplement", range: [0x0080, 0x00ff] },
  { name: "InLatin_Extended-A", range: [0x0100, 0x017f] },
  { name: "InLatin_Extended-B", range: [0x0180, 0x024f] },
  { name: "InIPA_Extensions", range: [0x0250, 0x02af] },
  { name: "InSpacing_Modifier_Letters", range: [0x02b0, 0x02ff] },
  { name: "InCombining_Diacritical_Marks", range: [0x0300, 0x036f] },
  { name: "InGreek_and_Coptic", range: [0x0370, 0x03ff] },
  { name: "InCyrillic", range: [0x0400, 0x04ff] },
  { name: "InCyrillic_Supplementary", range: [0x0500, 0x052f] },
  { name: "InArmenian", range: [0x0530, 0x058f] },
  { name: "InHebrew", range: [0x0590, 0x05ff] },
  { name: "InArabic", range: [0x0600, 0x06ff] },
  { name: "InSyriac", range: [0x0700, 0x074f] },
  { name: "InThaana", range: [0x0780, 0x07bf] },
  { name: "InDevanagari", range: [0x0900, 0x097f] },
  { name: "InBengali", range: [0x0980, 0x09ff] },
  { name: "InGurmukhi", range: [0x0a00, 0x0a7f] },
  { name: "InGujarati", range: [0x0a80, 0x0aff] },
  { name: "InOriya", range: [0x0b00, 0x0b7f] },
  { name: "InTamil", range: [0x0b80, 0x0bff] },
  { name: "InTelugu", range: [0x0c00, 0x0c7f] },
  { name: "InKannada", range: [0x0c80, 0x0cff] },
  { name: "InMalayalam", range: [0x0d00, 0x0d7f] },
  { name: "InSinhala", range: [0x0d80, 0x0dff] },
  { name: "InThai", range: [0x0e00, 0x0e7f] },
  { name: "InLao", range: [0x0e80, 0x0eff] },
  { name: "InTibetan", range: [0x0f00, 0x0fff] },
  { name: "InMyanmar", range: [0x1000, 0x109f] },
  { name: "InGeorgian", range: [0x10a0, 0x10ff] },
  { name: "InHangul_Jamo", range: [0x1100, 0x11ff] },
  { name: "InEthiopic", range: [0x1200, 0x137f] },
  { name: "InCherokee", range: [0x13a0, 0x13ff] },
  { name: "InUnified_Canadian_Aboriginal_Syllabics", range: [0x1400, 0x167f] },
  { name: "InOgham", range: [0x1680, 0x169f] },
  { name: "InRunic", range: [0x16a0, 0x16ff] },
  { name: "InTagalog", range: [0x1700, 0x171f] },
  { name: "InHanunoo", range: [0x1720, 0x173f] },
  { name: "InBuhid", range: [0x1740, 0x175f] },
  { name: "InTagbanwa", range: [0x1760, 0x177f] },
  { name: "InKhmer", range: [0x1780, 0x17ff] },
  { name: "InMongolian", range: [0x1800, 0x18af] },
  { name: "InLimbu", range: [0x1900, 0x194f] },
  { name: "InTai_Le", range: [0x1950, 0x197f] },
  { name: "InKhmer_Symbols", range: [0x19e0, 0x19ff] },
  { name: "InPhonetic_Extensions", range: [0x1d00, 0x1d7f] },
  { name: "InLatin_Extended_Additional", range: [0x1e00, 0x1eff] },
  { name: "InGreek_Extended", range: [0x1f00, 0x1fff] },
  { name: "InGeneral_Punctuation", range: [0x2000, 0x206f] },
  { name: "InSuperscripts_and_Subscripts", range: [0x2070, 0x209f] },
  { name: "InCurrency_Symbols", range: [0x20a0, 0x20cf] },
  {
    name: "InCombining_Diacritical_Marks_for_Symbols",
    range: [0x20d0, 0x20ff],
  },
  { name: "InLetterlike_Symbols", range: [0x2100, 0x214f] },
  { name: "InNumber_Forms", range: [0x2150, 0x218f] },
  { name: "InArrows", range: [0x2190, 0x21ff] },
  { name: "InMathematical_Operators", range: [0x2200, 0x22ff] },
  { name: "InMiscellaneous_Technical", range: [0x2300, 0x23ff] },
  { name: "InControl_Pictures", range: [0x2400, 0x243f] },
  { name: "InOptical_Character_Recognition", range: [0x2440, 0x245f] },
  { name: "InEnclosed_Alphanumerics", range: [0x2460, 0x24ff] },
  { name: "InBox_Drawing", range: [0x2500, 0x257f] },
  { name: "InBlock_Elements", range: [0x2580, 0x259f] },
  { name: "InGeometric_Shapes", range: [0x25a0, 0x25ff] },
  { name: "InMiscellaneous_Symbols", range: [0x2600, 0x26ff] },
  { name: "InDingbats", range: [0x2700, 0x27bf] },
  { name: "InMiscellaneous_Mathematical_Symbols-A", range: [0x27c0, 0x27ef] },
  { name: "InSupplemental_Arrows-A", range: [0x27f0, 0x27ff] },
  { name: "InBraille_Patterns", range: [0x2800, 0x28ff] },
  { name: "InSupplemental_Arrows-B", range: [0x2900, 0x297f] },
  { name: "InMiscellaneous_Mathematical_Symbols-B", range: [0x2980, 0x29ff] },
  { name: "InSupplemental_Mathematical_Operators", range: [0x2a00, 0x2aff] },
  { name: "InMiscellaneous_Symbols_and_Arrows", range: [0x2b00, 0x2bff] },
  { name: "InCJK_Radicals_Supplement", range: [0x2e80, 0x2eff] },
  { name: "InKangxi_Radicals", range: [0x2f00, 0x2fdf] },
  { name: "InIdeographic_Description_Characters", range: [0x2ff0, 0x2fff] },
  { name: "InCJK_Symbols_and_Punctuation", range: [0x3000, 0x303f] },
  { name: "InHiragana", range: [0x3040, 0x309f] },
  { name: "InKatakana", range: [0x30a0, 0x30ff] },
  { name: "InBopomofo", range: [0x3100, 0x312f] },
  { name: "InHangul_Compatibility_Jamo", range: [0x3130, 0x318f] },
  { name: "InKanbun", range: [0x3190, 0x319f] },
  { name: "InBopomofo_Extended", range: [0x31a0, 0x31bf] },
  { name: "InKatakana_Phonetic_Extensions", range: [0x31f0, 0x31ff] },
  { name: "InEnclosed_CJK_Letters_and_Months", range: [0x3200, 0x32ff] },
  { name: "InCJK_Compatibility", range: [0x3300, 0x33ff] },
  { name: "InCJK_Unified_Ideographs_Extension_A", range: [0x3400, 0x4dbf] },
  { name: "InYijing_Hexagram_Symbols", range: [0x4dc0, 0x4dff] },
  { name: "InCJK_Unified_Ideographs", range: [0x4e00, 0x9fff] },
  { name: "InYi_Syllables", range: [0xa000, 0xa48f] },
  { name: "InYi_Radicals", range: [0xa490, 0xa4cf] },
  { name: "InHangul_Syllables", range: [0xac00, 0xd7af] },
  { name: "InHigh_Surrogates", range: [0xd800, 0xdb7f] },
  { name: "InHigh_Private_Use_Surrogates", range: [0xdb80, 0xdbff] },
  { name: "InLow_Surrogates", range: [0xdc00, 0xdfff] },
  { name: "InPrivate_Use_Area", range: [0xe000, 0xf8ff] },
  { name: "InCJK_Compatibility_Ideographs", range: [0xf900, 0xfaff] },
  { name: "InAlphabetic_Presentation_Forms", range: [0xfb00, 0xfb4f] },
  { name: "InArabic_Presentation_Forms-A", range: [0xfb50, 0xfdff] },
  { name: "InVariation_Selectors", range: [0xfe00, 0xfe0f] },
  { name: "InCombining_Half_Marks", range: [0xfe20, 0xfe2f] },
  { name: "InCJK_Compatibility_Forms", range: [0xfe30, 0xfe4f] },
  { name: "InSmall_Form_Variants", range: [0xfe50, 0xfe6f] },
  { name: "InArabic_Presentation_Forms-B", range: [0xfe70, 0xfeff] },
  { name: "InHalfwidth_and_Fullwidth_Forms", range: [0xff00, 0xffef] },
  { name: "InSpecials", range: [0xfff0, 0xffff] },
  { name: "Linear B Syllabary", range: [0x10000, 0x1007f] },
  { name: "Linear B Ideograms", range: [0x10080, 0x100ff] },
  { name: "Aegean Numbers", range: [0x10100, 0x1013f] },
  { name: "Ancient Greek Numbers", range: [0x10140, 0x1018f] },
  { name: "Ancient Symbols", range: [0x10190, 0x101cf] },
  { name: "Phaistos Disc", range: [0x101d0, 0x101ff] },
  { name: "Lycian", range: [0x10280, 0x1029f] },
  { name: "Carian", range: [0x102a0, 0x102df] },
  { name: "Coptic Epact Numbers", range: [0x102e0, 0x102ff] },
  { name: "Old Italic", range: [0x10300, 0x1032f] },
  { name: "Gothic", range: [0x10330, 0x1034f] },
  { name: "Old Permic", range: [0x10350, 0x1037f] },
  { name: "Ugaritic", range: [0x10380, 0x1039f] },
  { name: "Old Persian", range: [0x103a0, 0x103df] },
  { name: "Deseret", range: [0x10400, 0x1044f] },
  { name: "Shavian", range: [0x10450, 0x1047f] },
  { name: "Osmanya", range: [0x10480, 0x104af] },
  { name: "Osage", range: [0x104b0, 0x104ff] },
  { name: "Elbasan", range: [0x10500, 0x1052f] },
  { name: "Caucasian Albanian", range: [0x10530, 0x1056f] },
  { name: "Linear A", range: [0x10600, 0x1077f] },
  { name: "Cypriot Syllabary", range: [0x10800, 0x1083f] },
  { name: "Imperial Aramaic", range: [0x10840, 0x1085f] },
  { name: "Palmyrene", range: [0x10860, 0x1087f] },
  { name: "Nabataean", range: [0x10880, 0x108af] },
  { name: "Hatran", range: [0x108e0, 0x108ff] },
  { name: "Phoenician", range: [0x10900, 0x1091f] },
  { name: "Lydian", range: [0x10920, 0x1093f] },
  { name: "Meroitic Hieroglyphs", range: [0x10980, 0x1099f] },
  { name: "Meroitic Cursive", range: [0x109a0, 0x109ff] },
  { name: "Kharoshthi", range: [0x10a00, 0x10a5f] },
  { name: "Old South Arabian", range: [0x10a60, 0x10a7f] },
  { name: "Old North Arabian", range: [0x10a80, 0x10a9f] },
  { name: "Manichaean", range: [0x10ac0, 0x10aff] },
  { name: "Avestan", range: [0x10b00, 0x10b3f] },
  { name: "Inscriptional Parthian", range: [0x10b40, 0x10b5f] },
  { name: "Inscriptional Pahlavi", range: [0x10b60, 0x10b7f] },
  { name: "Psalter Pahlavi", range: [0x10b80, 0x10baf] },
  { name: "Old Turkic", range: [0x10c00, 0x10c4f] },
  { name: "Old Hungarian", range: [0x10c80, 0x10cff] },
  { name: "Rumi Numeral Symbols", range: [0x10e60, 0x10e7f] },
  { name: "Yezidi", range: [0x10e80, 0x10ebf] },
  { name: "Old Sogdian", range: [0x10f00, 0x10f2f] },
  { name: "Sogdian", range: [0x10f30, 0x10f6f] },
  { name: "Chorasmian", range: [0x10fb0, 0x10fdf] },
  { name: "Elymaic", range: [0x10fe0, 0x10fff] },
  { name: "Brahmi", range: [0x11000, 0x1107f] },
  { name: "Kaithi", range: [0x11080, 0x110cf] },
  { name: "Sora Sompeng", range: [0x110d0, 0x110ff] },
  { name: "Chakma", range: [0x11100, 0x1114f] },
  { name: "Mahajani", range: [0x11150, 0x1117f] },
  { name: "Sharada", range: [0x11180, 0x111df] },
  { name: "Sinhala Archaic Numbers", range: [0x111e0, 0x111ff] },
  { name: "Khojki", range: [0x11200, 0x1124f] },
  { name: "Multani", range: [0x11280, 0x112af] },
  { name: "Khudawadi", range: [0x112b0, 0x112ff] },
  { name: "Grantha", range: [0x11300, 0x1137f] },
  { name: "Newa", range: [0x11400, 0x1147f] },
  { name: "Tirhuta", range: [0x11480, 0x114df] },
  { name: "Siddham", range: [0x11580, 0x115ff] },
  { name: "Modi", range: [0x11600, 0x1165f] },
  { name: "Mongolian Supplement", range: [0x11660, 0x1167f] },
  { name: "Takri", range: [0x11680, 0x116cf] },
  { name: "Ahom", range: [0x11700, 0x1173f] },
  { name: "Dogra", range: [0x11800, 0x1184f] },
  { name: "Warang Citi", range: [0x118a0, 0x118ff] },
  { name: "Dives Akuru", range: [0x11900, 0x1195f] },
  { name: "Nandinagari", range: [0x119a0, 0x119ff] },
  { name: "Zanabazar Square", range: [0x11a00, 0x11a4f] },
  { name: "Soyombo", range: [0x11a50, 0x11aaf] },
  { name: "Pau Cin Hau", range: [0x11ac0, 0x11aff] },
  { name: "Bhaiksuki", range: [0x11c00, 0x11c6f] },
  { name: "Marchen", range: [0x11c70, 0x11cbf] },
  { name: "Masaram Gondi", range: [0x11d00, 0x11d5f] },
  { name: "Gunjala Gondi", range: [0x11d60, 0x11daf] },
  { name: "Makasar", range: [0x11ee0, 0x11eff] },
  { name: "Lisu Supplement", range: [0x11fb0, 0x11fbf] },
  { name: "Tamil Supplement", range: [0x11fc0, 0x11fff] },
  { name: "Cuneiform", range: [0x12000, 0x123ff] },
  { name: "Cuneiform Numbers and Punctuation", range: [0x12400, 0x1247f] },
  { name: "Early Dynastic Cuneiform", range: [0x12480, 0x1254f] },
  { name: "Egyptian Hieroglyphs", range: [0x13000, 0x1342f] },
  { name: "Egyptian Hieroglyph Format Controls", range: [0x13430, 0x1343f] },
  { name: "Anatolian Hieroglyphs", range: [0x14400, 0x1467f] },
  { name: "Bamum Supplement", range: [0x16800, 0x16a3f] },
  { name: "Mro", range: [0x16a40, 0x16a6f] },
  { name: "Bassa Vah", range: [0x16ad0, 0x16aff] },
  { name: "Pahawh Hmong", range: [0x16b00, 0x16b8f] },
  { name: "Medefaidrin", range: [0x16e40, 0x16e9f] },
  { name: "Miao", range: [0x16f00, 0x16f9f] },
  { name: "Ideographic Symbols and Punctuation", range: [0x16fe0, 0x16fff] },
  { name: "Tangut", range: [0x17000, 0x187ff] },
  { name: "Tangut Components", range: [0x18800, 0x18aff] },
  { name: "Khitan Small Script", range: [0x18b00, 0x18cff] },
  { name: "Tangut Supplement", range: [0x18d00, 0x18d8f] },
  { name: "Khitan Small Script", range: [0x18b00, 0x18cff] },
  { name: "Tangut Components", range: [0x18800, 0x18aff] },
  { name: "Kana Supplement", range: [0x1b000, 0x1b0ff] },
  { name: "Kana Extended-A", range: [0x1b100, 0x1b12f] },
  { name: "Small Kana Extension", range: [0x1b130, 0x1b16f] },
  { name: "Nushu", range: [0x1b170, 0x1b2ff] },
  { name: "Duployan", range: [0x1bc00, 0x1bc9f] },
  { name: "Shorthand Format Controls", range: [0x1bca0, 0x1bcaf] },
  { name: "Byzantine Musical Symbols", range: [0x1d000, 0x1d0ff] },
  { name: "Musical Symbols", range: [0x1d100, 0x1d1ff] },
  { name: "Ancient Greek Musical Notation", range: [0x1d200, 0x1d24f] },
  { name: "Mayan Numerals", range: [0x1d2e0, 0x1d2ff] },
  { name: "Tai Xuan Jing Symbols", range: [0x1d300, 0x1d35f] },
  { name: "Counting Rod Numerals", range: [0x1d360, 0x1d37f] },
  { name: "Mathematical Alphanumeric Symbols", range: [0x1d400, 0x1d7ff] },
  { name: "Sutton SignWriting", range: [0x1d800, 0x1daaf] },
  { name: "Glagolitic Supplement", range: [0x1e000, 0x1e02f] },
  { name: "Nyiakeng Puachue Hmong", range: [0x1e100, 0x1e14f] },
  { name: "Wancho", range: [0x1e2c0, 0x1e2ff] },
  { name: "Mende Kikakui", range: [0x1e800, 0x1e8df] },
  { name: "Adlam", range: [0x1e900, 0x1e95f] },
  { name: "Indic Siyaq Numbers", range: [0x1ec70, 0x1ecbf] },
  { name: "Ottoman Siyaq Numbers", range: [0x1ed00, 0x1ed4f] },
  { name: "Arabic Mathematical Alphabetic Symbols", range: [0x1ee00, 0x1eeff] },
  { name: "Mahjong Tiles", range: [0x1f000, 0x1f02f] },
  { name: "Domino Tiles", range: [0x1f030, 0x1f09f] },
  { name: "Playing Cards", range: [0x1f0a0, 0x1f0ff] },
  { name: "Enclosed Alphanumeric Supplement", range: [0x1f100, 0x1f1ff] },
  { name: "Enclosed Ideographic Supplement", range: [0x1f200, 0x1f2ff] },
  { name: "Miscellaneous Symbols and Pictographs", range: [0x1f300, 0x1f5ff] },
  { name: "Emoticons", range: [0x1f600, 0x1f64f] },
  { name: "Ornamental Dingbats", range: [0x1f650, 0x1f67f] },
  { name: "Transport and Map Symbols", range: [0x1f680, 0x1f6ff] },
  { name: "Alchemical Symbols", range: [0x1f700, 0x1f77f] },
  { name: "Geometric Shapes Extended", range: [0x1f780, 0x1f7ff] },
  { name: "Supplemental Arrows-C", range: [0x1f800, 0x1f8ff] },
  { name: "Supplemental Symbols and Pictographs", range: [0x1f900, 0x1f9ff] },
  { name: "Chess Symbols", range: [0x1fa00, 0x1fa6f] },
  { name: "Symbols and Pictographs Extended-A", range: [0x1fa70, 0x1faff] },
  { name: "Symbols for Legacy Computing", range: [0x1fb00, 0x1fbff] },
];

export default function Home() {
  const [input, setInput] = useState<string>("");
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-5xl">Grapheme Breaker</h1>
      <textarea
        value={input}
        cols={50}
        rows={10}
        onChange={(event) => {
          setInput(event.target.value);
          console.log(event.target.value);
        }}
        className="text-black border-2"
      />
      <div>{renderGraphemes(stringToGraphemes(input))}</div>
    </main>
  );
}

const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

// stringを引数に取り、それを書記素単位の配列に変換する関数
export const stringToGraphemes = (str: string): Grapheme[] => {
  // segmenter.segment(str)[Symbol.iterator](); iteratorを返す
  return [...segmenter.segment(str)].map((grapheme) => {
    return {
      value: grapheme.segment,
      unicodeList: Array.from(grapheme.segment),
      isMultiByte: grapheme.segment.length > 1,
    };
  });
};

type Grapheme = {
  value: string;
  unicodeList: Array<string>;
  isMultiByte: boolean;
};

function renderGraphemes(graphemes: Grapheme[]): JSX.Element[] {
  return graphemes.reduce<{
    elements: JSX.Element[];
    currentString: string | null;
  }>(
    (acc, grapheme, index, array) => {
      // 改行コードの場合
      if (grapheme.value === "\n") {
        acc.elements.push(<span>{acc.currentString}</span>);
        acc.elements.push(<br />);
        acc.currentString = null;
        return acc;
      }

      // 現在のグラフェムがマルチバイトでない場合
      if (!grapheme.isMultiByte) {
        acc.currentString =
          acc.currentString === null
            ? grapheme.value
            : acc.currentString + grapheme.value;
      }

      // マルチバイト、または最後の要素の場合
      if (grapheme.isMultiByte || index === array.length - 1) {
        if (acc.currentString !== null) {
          acc.elements.push(<span>{acc.currentString}</span>);
          acc.currentString = null;
        }

        if (grapheme.isMultiByte) {
          acc.elements.push(
            <>
              <span
                key={index}
                className="bg-pink-300"
                data-tooltip-id={`${index}`}
                data-tooltip-place="top"
              >
                {grapheme.value}
              </span>
              <Tooltip id={`${index}`} clickable>
                {displayUnicodeList(grapheme.unicodeList)}
              </Tooltip>
            </>
          );
        }
      }

      return acc;
    },
    { elements: [], currentString: null }
  ).elements;
}

function displayUnicodeList(unicodeList: Array<string>): JSX.Element {
  return (
    <table>
      <tr>
        <th>Unicode</th>
        <th>Charactor</th>
        <th>Block</th>
      </tr>
      {unicodeList.map((unicode, index) => (
        <tr key={index.toString()}>
          <td>{`U+${unicode.codePointAt(0)?.toString(16)}`}</td>
          <td className="text-center">{unicode}</td>
          <td>{getUnicodeBlock(unicode)?.name}</td>
        </tr>
      ))}
    </table>
  );
}

function getUnicodeBlock(unicode: string): UnicodeBlock | null {
  const codePoint = unicode.codePointAt(0);
  if (codePoint === undefined) {
    return null;
  }

  const unicodeBlock = unicodeBlocks.find((unicodeBlock) => {
    return (
      codePoint >= unicodeBlock.range[0] && codePoint <= unicodeBlock.range[1]
    );
  });

  return unicodeBlock ?? null;
}
