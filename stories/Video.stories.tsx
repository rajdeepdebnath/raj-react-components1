import Video from '../src'

export default {
  title: 'My Component/Video',
  component: Video
}

const Template = (args) => ({
  //👇 Your template goes here
});

const PrimaryVideo = Template.bind({});

PrimaryVideo.args = {
  roomName:'Storybook Room'
};

export const Primary = {
  args: {
    roomName:'Storybook Room'
  },
};