import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component';

import { AsyncSelect, Option } from './async-select';

export type { AsyncSelectProps } from './async-select';

export default attachPropertiesToComponent(AsyncSelect, {
  Option,
});
