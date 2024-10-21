import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
// import { useIntl } from 'react-intl';
import { useLocale, useTranslations } from 'next-intl';
const SidebarMenuMain = () => {
  // const intl = useIntl();
  const t = useTranslations('Sidebar');

  const localActive = useLocale();
  return (
    <>
      <div >


        <SidebarMenuItem
          to={`/${localActive}/dashboard`}
          icon="home"
          title={t('dashboard')}
          fontIcon="bi-app-indicator"
        />

        <SidebarMenuItemWithSub
          to='/apps/chat'
          title='Manage'
          fontIcon='bi-chat-left'
          icon='burger-menu-2'
        >
          <SidebarMenuItem to={`/${localActive}/manage/cluster`} title={t('clustermenu')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/town`} title={t('townmenu')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/grampanchayat`} title={t('GramPanchayat')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/mahsulgaav`} title={t('Mahsulgaav')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/school`} title={t('school')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/student`} title={t('student')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/suvidha`} title={t('suvidha')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/representative`} title={t('pratinidhi')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/supervisor`} title={t('vaparkarta')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/bank`} title={t('Bank')} hasBullet={true} />
          <SidebarMenuItem to={`/${localActive}/manage/openingbalance`} title={t('PraranbhikSillak')} hasBullet={true} />
        </SidebarMenuItemWithSub>
        <SidebarMenuItem
          to={`/${localActive}/disbursementfunds`}
          icon="home"
          title={t('disbursementfunds')}
          fontIcon="bi-app-indicator"
        />

      </div>
    </>
  );
};

export { SidebarMenuMain };
