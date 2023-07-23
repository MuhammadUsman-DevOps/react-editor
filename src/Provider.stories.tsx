// Import necessary dependencies
import React from "react";
import { Story, Meta } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";
import { AppProvider } from "./contexts/AppContext";
import { DesignEditorProvider } from "./contexts/DesignEditor";
import { TimerProvider } from "./contexts/TimerContext";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./translations";
import { store } from "./store/store";

const engine = new Styletron();

// Create the Meta object with metadata for the component
export default {
  title: "Components/Provider",
  component: Provider,
  decorators: [
    (Story: React.ComponentType) => (
      <Provider store={store}>
        <DesignEditorProvider>
          <TimerProvider>
            <AppProvider>
              <MemoryRouter>
                <StyletronProvider value={engine}>
                  <BaseProvider theme={LightTheme}>
                    <I18nextProvider i18n={i18next}>
                      <Story />
                    </I18nextProvider>
                  </BaseProvider>
                </StyletronProvider>
              </MemoryRouter>
            </AppProvider>
          </TimerProvider>
        </DesignEditorProvider>
      </Provider>
    ),
  ],
} as Meta;

// Create a Template for the Story
const Template: Story = () => <div>Storybook Wrapper for Provider</div>;

// Define the Story using the Template
export const Default = Template.bind({});
