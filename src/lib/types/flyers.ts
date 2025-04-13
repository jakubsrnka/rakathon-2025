export type Flyer = {
  heading: string;
  slides: Slide[];
  tags: string[];
};

export type Slide = {
  title: string;
  content: string[];
};
