// Styles
import './VRadioGroup.sass'

// Components
import { VInput } from '../VInput'
import { VLabel } from '../VLabel'
import { VSelectionControlGroup } from '../VSelectionControlGroup'

// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utility
import { computed, defineComponent } from 'vue'
import { getUid, useRender } from '@/util'

export const VRadioGroup = defineComponent({
  name: 'VRadioGroup',

  inheritAttrs: false,

  props: {
    height: {
      type: [Number, String],
      default: 'auto',
    },
    label: String,
    id: String,
    inline: Boolean,
    onIcon: {
      type: String,
      default: '$radioOn',
    },
    offIcon: {
      type: String,
      default: '$radioOff',
    },
    type: {
      type: String,
      default: 'radio',
    },

    ...makeValidationProps(),
  },

  setup (props, { attrs, slots }) {
    const { errorMessages, isDisabled, isReadonly, isValid, validationClasses } = useValidation(props, 'v-radio-group')

    const uid = getUid()
    const id = computed(() => props.id || `radio-group-${uid}`)

    useRender(() => {
      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label

      return (
        <VInput
          class={[
            'v-radio-group',
            validationClasses.value,
          ]}
          messages={ props.errorMessages?.length ? props.errorMessages : errorMessages.value }
          { ...attrs }
        >
          { label && (
            <VLabel
              disabled={ isDisabled.value }
              error={ isValid.value === false }
              for={ id.value }
            >
              { label }
            </VLabel>
          ) }

          <VSelectionControlGroup
            disabled={ isDisabled.value }
            onIcon={ props.onIcon }
            offIcon={ props.offIcon }
            type={ props.type }
            role="radiogroup"
            readonly={ isReadonly.value }
            inline={ props.inline }
            v-slots={ slots }
          />
        </VInput>
      )
    })

    return {}
  },
})