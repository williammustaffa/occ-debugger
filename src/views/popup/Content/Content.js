import { h } from 'preact';
import { Title, Checkbox } from '@components';
import { useConfigs } from '@contexts/configs';
import { Section, ContentStyled } from './Content.styles';

export function Content() {
  const { configs, tab, updateConfigs } = useConfigs();
  const { isValid, isReady } = configs;

  if (!isValid) {
    return (
      <ContentStyled centered height={100}>
        <div>{isReady ? 'This is not an OCC site.' : 'Please, refresh your tab!'}</div>
      </ContentStyled>
    );
  }

  return (
    <ContentStyled>
      <Section>
        <Checkbox
          label="Enabled"
          checked={configs.enabled}
          onChange={updateConfigs('enabled')}
        />
      </Section>
      <Section>
        <Title>Console</Title>
        <Checkbox
          disabled={!configs.enabled}
          label="Topics"
          checked={configs.topics}
          onChange={updateConfigs('topics')}
        />
        <Checkbox
          disabled={!configs.enabled}
          label="Spinner"
          checked={configs.spinner}
          onChange={updateConfigs('spinner')}
        />
        <Title>Panel</Title>
        <Checkbox
          disabled={!configs.enabled}
          label="Serialize data"
          checked={configs.toJS}
          onChange={updateConfigs('toJS')}
        />
      </Section>
    </ContentStyled>
  );
}