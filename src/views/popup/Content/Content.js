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
        <div>{registered ? 'This is not an OCC site.' : 'Please, refresh your tab!'}</div>
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
        <Title>Devtools</Title>
        <Checkbox
          disabled={!options.enabled}
          label="Cookies"
          checked={options.cookies}
          onChange={updateConfigs('options.cookies')}
        />
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
        <Checkbox
          disabled={!options.enabled}
          label="Serialize"
          checked={options.toJS}
          onChange={updateConfigs('options.toJS')}
        />
        <Title>Panels</Title>
        <Checkbox
          disabled={!options.enabled}
          label="OCC Debugger"
          checked={options.debuggerPanel}
          onChange={updateConfigs('options.debuggerPanel')}
        />
        <Checkbox
          disabled={!options.enabled}
          label="OCC Layout"
          checked={options.layoutPanel}
          onChange={updateConfigs('options.layoutPanel')}
        />
        <Checkbox
          disabled={!options.enabled}
          label="OCC Analytics"
          checked={options.analyticsPanel}
          onChange={updateConfigs('options.analyticsPanel')}
        />
      </Section>
    </ContentStyled>
  );
}