import { h } from 'preact';
import { Accordion } from '@components';
import { observables } from '@utils';
import { TaggingRelationshipTitle } from './TaggingRelationshipTitle';
import { TaggingRelationshipEvents } from './TaggingRelationshipEvents';
import { TaggingRelationshipActions } from './TaggingRelationshipActions';

export const TaggingRelationship = ({ relationship }) => (
  <Accordion
    title={<TaggingRelationshipTitle relationship={relationship}/>}
    enabled={!observables.unwrap(relationship.widget.global)}
  >
    <TaggingRelationshipActions relationship={relationship}/>
    <TaggingRelationshipEvents events={relationship.events}/>
  </Accordion>
);