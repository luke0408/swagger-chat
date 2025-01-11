export interface Translation {
  common: {
    confirm: string;
    cancel: string;
    close: string;
  };
  header: {
    documentation: string;
    chat: string;
    settings: string;
    language: string;
    navigation: string;
    layout: {
      draggable: string;
      split: string;
    };
  };
  modal: {
    refresh: {
      title: string;
      message: string;
      confirm: string;
    };
  };
  landing: {
    header: {
      title: {
        line1: string;
        line2: string;
      };
      description: string;
    };
    main: {
      getStarted: string;
      steps: {
        '1': string;
        '2': string;
        '3': string;
      };
      input: {
        url: string;
        file: string;
        placeholder: string;
        submit: string;
        dragAndDrop: string;
        browse: string;
        error: {
          invalidDocument: string;
        };
      };
      help: {
        title: string;
        layout: {
          title: string;
          content: string[];
        };
      };
    };
    footer: {
      line1: string;
      line2: string;
    };
  };
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: Translation;
    };
  }
}
