import { h } from 'preact';
import { Title, Checkbox } from '@components';
import { useConfigs } from '@contexts/configs';
import { Section, ContentStyled } from './Content.styles';

export function Content() {
  const { configs, updateConfigs } = useConfigs();
  const { valid, registered, options } = configs;

  if (!valid) {
    return (
      <ContentStyled centered height={100}>
        <div>{registered ? 'This is not an OCC site.' : 'Please, refresh your tab!'}<br />{JSON.stringify(configs, null, 2)}</div>
      </ContentStyled>
    );
  }

  return (
    <ContentStyled>
      <Section>
        <Checkbox
          label="Enabled"
          checked={options.enabled}
          onChange={updateConfigs('options.enabled')}
        />
      </Section>
      <Section>
        <Title>Console</Title>
        <Checkbox
          disabled={!options.enabled}
          label="Topics"
          checked={options.topics}
          onChange={updateConfigs('options.topics')}
        />
        <Checkbox
          disabled={!options.enabled}
          label="Spinner"
          checked={options.spinner}
          onChange={updateConfigs('options.spinner')}
        />
        <Title>Panel</Title>
        <Checkbox
          disabled={!options.enabled}
          label="Serialize data"
          checked={options.toJS}
          onChange={updateConfigs('options.toJS')}
        />
      </Section>
    </ContentStyled>
  );
}