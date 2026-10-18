import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_abouts';
  info: {
    displayName: 'About';
    icon: 'grid';
  };
  attributes: {
    certificatesLabel: Schema.Attribute.String;
    content: Schema.Attribute.Blocks;
    experienceLabel: Schema.Attribute.String;
    heading: Schema.Attribute.Component<'shared.section-heading', false>;
    infoCards: Schema.Attribute.Component<'shared.info-card', true>;
    shortText: Schema.Attribute.String;
    sitesCount: Schema.Attribute.Integer;
    sitesLabel: Schema.Attribute.String;
    stackItems: Schema.Attribute.Component<'shared.text-items', true>;
    stackText: Schema.Attribute.String;
  };
}

export interface BlocksSkills extends Struct.ComponentSchema {
  collectionName: 'components_blocks_skills';
  info: {
    displayName: 'Skills';
  };
  attributes: {
    heading: Schema.Attribute.Component<'shared.section-heading', false>;
    skills: Schema.Attribute.Component<'shared.skill-block', true>;
  };
}

export interface LayoutMainMenu extends Struct.ComponentSchema {
  collectionName: 'components_layout_main_menus';
  info: {
    displayName: 'Main Menu';
    icon: 'apps';
  };
  attributes: {
    navItems: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface LayoutUiLabels extends Struct.ComponentSchema {
  collectionName: 'components_layout_ui_labels';
  info: {
    displayName: 'UI Labels';
    icon: 'message';
  };
  attributes: {
    allLabel: Schema.Attribute.String;
    closeLabel: Schema.Attribute.String;
    copiedLabel: Schema.Attribute.String;
    copyLabel: Schema.Attribute.String;
    imageViewerLabel: Schema.Attribute.String;
    languageLabel: Schema.Attribute.String;
    nextImageLabel: Schema.Attribute.String;
    previousImageLabel: Schema.Attribute.String;
    visitSiteLabel: Schema.Attribute.String;
  };
}

export interface SharedContactItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_items';
  info: {
    displayName: 'Contact Item';
    icon: 'phone';
  };
  attributes: {
    copyable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_info_cards';
  info: {
    displayName: 'Info card';
  };
  attributes: {
    description: Schema.Attribute.Component<'shared.key-value', true>;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    years: Schema.Attribute.String;
  };
}

export interface SharedKeyValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_key_values';
  info: {
    displayName: 'Key/Value';
  };
  attributes: {
    key: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    slug: Schema.Attribute.String;
  };
}

export interface SharedSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headings';
  info: {
    displayName: 'Section heading';
  };
  attributes: {
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedSkill extends Struct.ComponentSchema {
  collectionName: 'components_shared_skills';
  info: {
    displayName: 'Skill';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    skillName: Schema.Attribute.String;
  };
}

export interface SharedSkillBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_skill_blocks';
  info: {
    displayName: 'Skill block';
  };
  attributes: {
    skills: Schema.Attribute.Component<'shared.skill', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedTextItems extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    displayName: 'Text items';
  };
  attributes: {
    item: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about': BlocksAbout;
      'blocks.skills': BlocksSkills;
      'layout.main-menu': LayoutMainMenu;
      'layout.ui-labels': LayoutUiLabels;
      'shared.contact-item': SharedContactItem;
      'shared.info-card': SharedInfoCard;
      'shared.key-value': SharedKeyValue;
      'shared.link': SharedLink;
      'shared.section-heading': SharedSectionHeading;
      'shared.skill': SharedSkill;
      'shared.skill-block': SharedSkillBlock;
      'shared.text-items': SharedTextItems;
    }
  }
}
