export interface LiteraryWork {
  id: string;
  titleBn: string;
  titleEn: string;
  authorBn: string;
  authorEn: string;
  year?: string;
  category: 'Poetry' | 'Prose' | 'Song / Agamani' | 'Children / Whimsical' | 'Drama';
  excerptBn: string;
  excerptEn: string;
  fullTextBn: string;
  fullTextEn: string;
  culturalNote: string;
  bengaliWordHighlights: { wordBn: string; meaningEn: string }[];
}

export interface ArtWork {
  id: string;
  titleBn: string;
  titleEn: string;
  artistBn: string;
  artistEn: string;
  styleCategory: 'Kalighat Patachitra' | 'Jamini Roy Tempera' | 'Bengal School' | 'Terracotta Craft' | 'Clay Idol & Kumartuli';
  period: string;
  descriptionBn: string;
  descriptionEn: string;
  colorPaletteHex: string[];
  svgArtType: 'jamini_durga' | 'kalighat_cat' | 'terracotta_temple' | 'kumartuli_idol' | 'tagore_landscape' | 'alpana_mandala';
  imageUrl?: string;
  culturalStory: string;
}

export interface PujaDay {
  id: string;
  dayNameBn: string;
  dayNameEn: string;
  date2026: string;
  banglaDate: string;
  tithi: string;
  primaryRitual: string;
  bhogSpeciality: string;
  attireRecommendation: string;
  spiritualSignificance: string;
  iconName: string;
}

export interface GlossaryWord {
  wordBn: string;
  phonetic: string;
  englishMeaning: string;
  culturalContext: string;
  category: 'Puja' | 'Art' | 'Literature' | 'Emotion';
}

export interface GeneratedPoem {
  bengaliTitle: string;
  poemLines: string[];
  greetingText: string;
  culturalNote: string;
}
