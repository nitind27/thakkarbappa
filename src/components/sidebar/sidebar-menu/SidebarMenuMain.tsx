import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
// import { useIntl } from 'react-intl';

const SidebarMenuMain = () => {
  // const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="home"
        // title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        title="Dashboard"
        fontIcon="bi-app-indicator"
      />
      {/* <SidebarMenuItem
        to="/manage"
        icon="calendar"
        title="Manage"
        fontIcon="calendar"

      /> */}


      <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Manage'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/manage/cluster' title='Cluster' hasBullet={true} />
        <SidebarMenuItem to='/manage/town' title='Town' hasBullet={true} />
        <SidebarMenuItem to='/manage/grampanchayat' title='Gram Panchayat' hasBullet={true} />
        <SidebarMenuItem to='/manage/mahsulgaav' title='mahsul gaav' hasBullet={true} />
        <SidebarMenuItem to='/manage/school' title='school' hasBullet={true} />
        <SidebarMenuItem to='/manage/student' title='student' hasBullet={true} />
        <SidebarMenuItem to='/manage/suvidha' title='suvidha' hasBullet={true} />
        <SidebarMenuItem to='/manage/representative' title='pratinidhi' hasBullet={true} />
        <SidebarMenuItem to='/manage/supervisor' title='vaparkarta' hasBullet={true} />
        <SidebarMenuItem to='/manage/bank' title='Bank' hasBullet={true} />
        <SidebarMenuItem to='/manage/openingbalance' title='pranbhik sillak' hasBullet={true} />
      </SidebarMenuItemWithSub>


    </>
  );
};

export { SidebarMenuMain };
