import { title } from '@/components/primitives';

export default function PrivacyPage() {
  return (
    <>
      <div className='text-center'>
        <h1 className={title()}>Privacy</h1>
        <h5 className='text-default-500 text-lg'>Our privacy policy</h5>
      </div>
      <div className='mt-10'>
        This privacy policy will explain how we use the personal data we collect
        from you when you use our website.
        <h2>What data do we collect?</h2>
        We collect the following data
        <br />
        <br />
        <ul>
          <li>Chosen survey language</li>
          <li>Survey responses</li>
          <li>Datetime of submitted survey</li>
        </ul>
        <br />
        We also use Google Analytics to measure traffic to our site and how
        users interact with our site. The Google Analytics terms specify that no
        personally identifiable information may be collected through the Google
        Analytics software.
        <br />
        <br />
        Read more about Google Analytics privacy policy{' '}
        <a
          href='https://policies.google.com/privacy'
          rel='noopener noreferrer'
          target='_blank'
        >
          here
        </a>
        .<h2>How do we collect your data?</h2>
        Google Analytics sets the following cookies:
        <br />
        <br />
        <ul>
          <li>
            &quot;_ga&quot; is used to distingusih users. The cookie is set the
            first time a user access the website and has a lifetime of 2 until
            years
          </li>
          <li>
            &quot;_gat&quot; is used to limit the traffic from Google Analytics,
            this cookie has a lifetime of 10 minutes.
          </li>
        </ul>
        <br />
        Your web browser also automatically sends information to our hosting
        provider Zeit.
        <br />
        This can i.e. be information about wich browser and version you are
        using and your Internet address (IP-address). For each page that is
        displayed, the date and time information, which page you came from,
        which page you are on, etc. are also stored.
        <br />
        <br />
        When you submit the survey the information you provide (described above)
        is stored in our database.
        <h2>How will we use your data?</h2>
        We use Google Analytics to get statistics on how visitors use the site.
        <br />
        <br />
        We will create statistical, aggregated data from the survey results for
        analytical purposes.
        <h2>How do we store your data?</h2>
        <h2>How to contact us?</h2>
        If you have any questions about this privacy policy, please contact us.
      </div>
    </>
  );
}
