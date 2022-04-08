import { AbilityBuilder, Ability } from "@casl/ability"
import { resolveUserRoles } from '../utils.js'

export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  // no usuario = no reglas
  if (!user) return new Ability(rules);
  const roles = resolveUserRoles(user)

  roles.forEach(role => {
    switch (role) {
      case 'admin':
        can('manage', 'all');
        break;
      case 'user':
        can('read', 'Asset', { id: 'wp1' });
        break;
      default:
        // usuarios anonimos no hacen nada
        can();
        break;
    }
  });

  return new Ability(rules);
}
