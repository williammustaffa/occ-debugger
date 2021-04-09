import { h } from 'preact';
import { Accordion } from '@components';
import { TaggingRelationshipTitle } from './TaggingRelationshipTitle';
import { TaggingRelationshipEvents } from './TaggingRelationshipEvents';
import { TaggingRelationshipActions } from './TaggingRelationshipActions';

export const TaggingRelationship = ({ relationship }) => (
  <Accordion title={<TaggingRelationshipTitle relationship={relationship}/>}>
    <TaggingRelationshipActions relationship={relationship}/>
    <TaggingRelationshipEvents events={relationship.events}/>
  </Accordion>
);