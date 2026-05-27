import UpdateProfileSection from '../../components/members/UpdateProfileSection'
import ResetPasswordSection from '../../components/members/ResetPasswordSection'

const MemberProfile = () => (
  <div className="max-w-xl flex flex-col gap-10">
    <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
      My Profile
    </h1>
    <UpdateProfileSection />
    <div className="border-t border-rim" />
    <ResetPasswordSection />
  </div>
)

export default MemberProfile
