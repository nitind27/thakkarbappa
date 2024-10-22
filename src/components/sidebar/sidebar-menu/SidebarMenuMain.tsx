import { useState, useEffect } from 'react';
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { useLocale, useTranslations } from 'next-intl';
import Loader from '@/common/Loader ';

const SidebarMenuMain = () => {
  const t = useTranslations('Sidebar');
  const localActive = useLocale();

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to handle click and store path in localStorage
  const handleItemClick = (path: string) => {
    if (typeof window !== 'undefined') { // Ensure this runs only on the client-side

      // Set loading to true and start a timer to reset it after 3 seconds
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500); // 3000 milliseconds = 3 seconds
    }
  };

  return (
    <>
      <div>
        {/* Loading Indicator */}
        {loading && <Loader />}

        {/* Dashboard Menu Item */}
        <SidebarMenuItem
          to={`/${localActive}/dashboard`}
          icon="home"
          title={t('dashboard')}
          fontIcon="bi-app-indicator"
          onClick={() => handleItemClick(`/${localActive}/dashboard`)} // Store path on click
        />

        {/* Manage Submenu */}
        <SidebarMenuItemWithSub
          to='/apps/chat'
          title='Manage'
          fontIcon='bi-chat-left'
          icon='burger-menu-2'
        >
          {/* List of Manage Submenu Items */}
          <SidebarMenuItem
            to={`/${localActive}/manage/cluster`}
            title={t('clustermenu')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/cluster`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/town`}
            title={t('townmenu')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/town`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/grampanchayat`}
            title={t('GramPanchayat')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/grampanchayat`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/mahsulgaav`}
            title={t('Mahsulgaav')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/mahsulgaav`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/school`}
            title={t('school')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/school`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/student`}
            title={t('student')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/student`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/suvidha`}
            title={t('suvidha')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/suvidha`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/representative`}
            title={t('pratinidhi')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/representative`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/supervisor`}
            title={t('vaparkarta')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/supervisor`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/bank`}
            title={t('Bank')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/bank`)} // Store path on click
          />
          <SidebarMenuItem
            to={`/${localActive}/manage/openingbalance`}
            title={t('PraranbhikSillak')}
            hasBullet={true}
            onClick={() => handleItemClick(`/${localActive}/manage/openingbalance`)} // Store path on click
          />
        </SidebarMenuItemWithSub>

        {/* Disbursement Funds Menu Item */}
        <SidebarMenuItem
          to={`/${localActive}/disbursementfunds`}
          icon="home"
          title={t('disbursementfunds')}
          fontIcon="bi-app-indicator"
          onClick={() => handleItemClick(`/${localActive}/disbursementfunds`)} // Store path on click
        />
      </div>
    </>
  );
};

export { SidebarMenuMain };