// File: tests/unit/Todo.spec.js
import { mount } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'

describe('Todo.vue', () => {
  it('filters todos based on computed property', async () => {
    const wrapper = mount(Todo)
    await wrapper.setData({
      todos: [
        { id: 1, text: 'Short' },
        { id: 2, text: 'This is a long todo item' }
      ],
      filter: 'short'
    })

    const listItems = wrapper.findAll('li')
    expect(listItems).toHaveLength(1)
    expect(listItems[0].text()).toContain('Short')
  })

  it('adds a new todo item when Enter is pressed', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('New Task')
    await input.trigger('keydown.enter')

    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.text()).toContain('New Task')
  })

  it('shows error message when trying to add an empty todo', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('')
    await input.trigger('keydown.enter')

    expect(wrapper.text()).toContain('Todo cannot be empty')
  })
})
