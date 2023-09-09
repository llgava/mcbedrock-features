import fs from 'fs';
import path from 'path';

export class Feature {
  constructor(data, featurePath) {
    this.data = data;
    this.path = featurePath;
    this.parsedPath = this.path.replace('\\features', '');

    this.type = this.getFeatureType();
    this.identifier = this.mountIdentifier();
    this.version = path.dirname(this.parsedPath);
    this.description = this.mountDescription();

    this.MDLink = this.mountMarkdownLink();
  }

  getFeatureType() {
    const props = Object.keys(this.data);
    return props[1];
  }

  mountIdentifier() {
    return this.data[this.type].description.identifier;
  }

  mountMarkdownLink() {
    const file = path.basename(this.parsedPath);
    return `[${this.identifier}](latest/features/${file})`;
  }

  mountDescription() {
    const rawDocs = fs.readFileSync('./docs.json');
    const docs = JSON.parse(rawDocs);

    return docs[this.identifier] || '';
  }
}
